-- CreateEnum
CREATE TYPE "public"."WebsiteStatus" AS ENUM ('UP', 'DOWN', 'UNKNOWN');

-- CreateTable
CREATE TABLE "public"."Website" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "timeadded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WebsiteTick" (
    "id" TEXT NOT NULL,
    "responeTime" INTEGER NOT NULL,
    "status" "public"."WebsiteStatus" NOT NULL,
    "regionId" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,

    CONSTRAINT "WebsiteTick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Website_url_key" ON "public"."Website"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "public"."Region"("name");

-- AddForeignKey
ALTER TABLE "public"."WebsiteTick" ADD CONSTRAINT "WebsiteTick_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WebsiteTick" ADD CONSTRAINT "WebsiteTick_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "public"."Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
