-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_shortUrl_key" ON "links"("shortUrl");
