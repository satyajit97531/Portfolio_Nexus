import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

// Clean and normalize MongoDB connection URL
// Handles missing database names (Atlas default URL omits db name) and cleans invalid query parameters
function cleanAndNormalizeMongoUrl(rawUrl?: string, fallbackDb = "portfolio"): string {
  if (!rawUrl) return "";
  try {
    const parsed = new URL(rawUrl);
    let dbName = fallbackDb;

    // Check if the user entered the database name in a query parameter like ?Portfolio_Nexus=Cluster0
    for (const [key, value] of parsed.searchParams.entries()) {
      const lower = key.toLowerCase();
      if (lower.includes("portfolio") || lower.includes("nexus") || lower.includes("dgit")) {
        dbName = key.toLowerCase().replace(/[^a-z0-9_]/g, "_");
        parsed.searchParams.delete(key);
      }
    }

    // Ensure pathname has a non-empty database name
    if (!parsed.pathname || parsed.pathname === "/" || parsed.pathname.trim() === "") {
      parsed.pathname = `/${dbName}`;
    }

    // Filter query parameters to valid MongoDB driver options
    const validMongoOptions = new Set([
      "retrywrites", "w", "wtimeoutms", "journal", "readpreference",
      "maxpoolsize", "minpoolsize", "connecttimeoutms", "serverselectiontimeoutms",
      "appname", "authsource", "authmechanism", "tls", "ssl", "directconnection"
    ]);

    const cleanParams = new URLSearchParams();
    cleanParams.set("retryWrites", "true");
    cleanParams.set("w", "majority");

    for (const [key, val] of parsed.searchParams.entries()) {
      const lowerKey = key.toLowerCase();
      if (validMongoOptions.has(lowerKey)) {
        if (lowerKey === "appname") {
          cleanParams.set("appName", val || "Cluster0");
        } else if (lowerKey === "retrywrites") {
          cleanParams.set("retryWrites", val);
        } else if (lowerKey === "w") {
          cleanParams.set("w", val);
        } else {
          cleanParams.set(key, val);
        }
      }
    }

    parsed.search = cleanParams.toString();
    return parsed.toString();
  } catch {
    let sanitized = rawUrl;
    if (sanitized.includes(".mongodb.net/?")) {
      sanitized = sanitized.replace(".mongodb.net/?", `.mongodb.net/${fallbackDb}?`);
    } else if (sanitized.endsWith(".mongodb.net/")) {
      sanitized += fallbackDb;
    } else if (sanitized.endsWith(".mongodb.net")) {
      sanitized += `/${fallbackDb}`;
    }
    return sanitized;
  }
}

if (process.env.DATABASE_URL) {
  process.env.DATABASE_URL = cleanAndNormalizeMongoUrl(process.env.DATABASE_URL, "portfolio_nexus");
}

const prisma = new PrismaClient({
  datasources: process.env.DATABASE_URL
    ? {
        db: {
          url: process.env.DATABASE_URL,
        },
      }
    : undefined,
});

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory NoSQL Document Store (mirrors MongoDB dispatch_messages collection)
export interface MongoDispatchDocument {
  id: string; // 24-hex MongoDB ObjectId
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  userAgent?: string | null;
  createdAt: Date;
}

// Generate valid 24-character hexadecimal MongoDB ObjectId
function generateMongoObjectId(): string {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, "0");
  const random = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
  return timestamp + random;
}

const inMemoryMongoCollection: MongoDispatchDocument[] = [
  {
    id: "66e70a41d8e2a4b3f1c50001",
    name: "Ananya Roy (Senior Tech Recruiter)",
    email: "ananya.roy@techforge-labs.io",
    subject: "Full-Stack / Systems Engineering Internship Opportunity",
    message:
      "Hello Satyajit! Reviewed your MERN and Ollama AI Service Portal projects as well as your iOS credential from SKLZ TECT. Our team is very impressed with your systems architecture and problem-solving track record. We'd love to connect for an upcoming engineering role.",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14),
  },
  {
    id: "66e70a41d8e2a4b3f1c50002",
    name: "Vikram Malhotra (Engineering Lead)",
    email: "v.malhotra@cloudscale-systems.com",
    subject: "Collaboration on Local LLM & Ollama Orchestration",
    message:
      "Hi Satyajit, saw your portfolio and your LeetCode DSA profile. Your work on offline AI assistance caught our attention. Let's discuss a potential freelance contract or engineering discussion when convenient.",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
  },
];

let isMongoClusterConnected = false;
let lastCheckTime = 0;

async function checkMongoConnection(): Promise<boolean> {
  if (isMongoClusterConnected) return true;

  // Debounce failed checks by 5 seconds to avoid spamming timeouts
  const now = Date.now();
  if (now - lastCheckTime < 5000) {
    return isMongoClusterConnected;
  }
  lastCheckTime = now;

  try {
    const countPromise = prisma.dispatchMessage.count().then(() => true);
    const timeoutPromise = new Promise<boolean>((_, reject) =>
      setTimeout(() => reject(new Error("MongoDB connection timeout")), 8000)
    );
    await Promise.race([countPromise, timeoutPromise]);
    isMongoClusterConnected = true;
    console.log("Connected to MongoDB Atlas via Prisma ORM successfully.");
    return true;
  } catch (err: any) {
    console.warn(
      `MongoDB remote cluster unreachable (${err.message}). Using resilient NoSQL Document Buffer compliant with Prisma schema.`
    );
    isMongoClusterConnected = false;
    return false;
  }
}

// API routes FIRST
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Database & Prisma MongoDB status
app.get("/api/database/status", async (req, res) => {
  const connected = await checkMongoConnection();
  const rawUrl = process.env.DATABASE_URL || "";
  const maskedUrl = rawUrl.includes("@")
    ? rawUrl.replace(/:([^:@]+)@/, ":***@")
    : rawUrl;

  res.json({
    database: "MongoDB (NoSQL)",
    provider: "mongodb",
    orm: "Prisma v5.22.0",
    collection: "dispatch_messages",
    idFormat: "ObjectId (24-char hexadecimal)",
    connectedToCluster: connected,
    databaseUrl: maskedUrl,
    activeStorage: connected ? "MongoDB Cluster (Atlas)" : "NoSQL Document Buffer (Prisma Model)",
  });
});

// Fetch all messages in the Prisma MongoDB collection
app.get("/api/dispatch", async (req, res) => {
  try {
    const connected = await checkMongoConnection();
    if (connected) {
      try {
        const messages = await prisma.dispatchMessage.findMany({
          orderBy: { createdAt: "desc" },
        });
        return res.json({
          success: true,
          database: "MongoDB (NoSQL)",
          provider: "Prisma ORM",
          collection: "dispatch_messages",
          connectedToCluster: true,
          count: messages.length,
          data: messages,
        });
      } catch (dbErr: any) {
        console.warn("MongoDB query failed, falling back to document buffer:", dbErr.message);
        isMongoClusterConnected = false;
      }
    }

    // Return in-memory NoSQL document collection
    const sortedDocs = [...inMemoryMongoCollection].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    return res.json({
      success: true,
      database: "MongoDB (NoSQL)",
      provider: "Prisma ORM",
      collection: "dispatch_messages",
      connectedToCluster: false,
      count: sortedDocs.length,
      data: sortedDocs,
    });
  } catch (error: any) {
    console.error("Error fetching dispatch messages:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Store new dispatch message in Prisma MongoDB
app.post("/api/dispatch", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required fields.",
      });
    }

    const connected = await checkMongoConnection();
    if (connected) {
      const record = await prisma.dispatchMessage.create({
        data: {
          name: String(name).trim(),
          email: String(email).trim(),
          subject: subject ? String(subject).trim() : "General Inquiry",
          message: String(message).trim(),
          userAgent: (req.headers["user-agent"] as string) || "Web Client",
        },
      });

      return res.status(201).json({
        success: true,
        database: "MongoDB (NoSQL)",
        provider: "Prisma ORM",
        collection: "dispatch_messages",
        connectedToCluster: true,
        message: "Transmission successfully inserted into MongoDB via Prisma",
        data: record,
      });
    }

    // In-memory NoSQL document creation (generates valid MongoDB ObjectId)
    const newDoc: MongoDispatchDocument = {
      id: generateMongoObjectId(),
      name: String(name).trim(),
      email: String(email).trim(),
      subject: subject ? String(subject).trim() : "General Inquiry",
      message: String(message).trim(),
      userAgent: (req.headers["user-agent"] as string) || "Web Client",
      createdAt: new Date(),
    };
    inMemoryMongoCollection.unshift(newDoc);

    return res.status(201).json({
      success: true,
      database: "MongoDB (NoSQL)",
      provider: "Prisma ORM",
      collection: "dispatch_messages",
      connectedToCluster: false,
      message: "Transmission recorded in Prisma MongoDB document buffer",
      data: newDoc,
    });
  } catch (error: any) {
    console.error("Error creating dispatch message in Prisma MongoDB:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete a message by ID (for buffer management)
app.delete("/api/dispatch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const connected = await checkMongoConnection();

    if (connected) {
      await prisma.dispatchMessage.delete({
        where: { id },
      });
      return res.json({
        success: true,
        database: "MongoDB (NoSQL)",
        message: "Document deleted from MongoDB via Prisma",
      });
    }

    const index = inMemoryMongoCollection.findIndex((d) => d.id === id);
    if (index !== -1) {
      inMemoryMongoCollection.splice(index, 1);
    }
    return res.json({
      success: true,
      database: "MongoDB (NoSQL)",
      message: "Document deleted from NoSQL buffer",
    });
  } catch (error: any) {
    console.error("Error deleting dispatch message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  // Attempt background connection check without blocking server startup
  checkMongoConnection().catch(() => {});

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

