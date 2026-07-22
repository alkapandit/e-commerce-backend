-- CreateTable
CREATE TABLE "banner" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "placement" TEXT NOT NULL,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);
