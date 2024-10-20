-- CreateTable
CREATE TABLE "Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "maxSalary" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dateSaved" DATETIME NOT NULL,
    "deadline" DATETIME,
    "dateApplied" DATETIME,
    "followUp" DATETIME,
    "excitement" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
