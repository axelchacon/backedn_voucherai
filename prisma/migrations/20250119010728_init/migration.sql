-- CreateTable
CREATE TABLE "Imagevoucher" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "resultimage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Imagevoucher_pkey" PRIMARY KEY ("id")
);
