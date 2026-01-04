-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "notifications_radius" INTEGER NOT NULL DEFAULT 100,
    "show_paid_spots" BOOLEAN NOT NULL DEFAULT false,
    "show_unpaid_spots" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);
