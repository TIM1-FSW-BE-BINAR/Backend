/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `airlines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `airports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `booking_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `flights` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `passengers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_user_id_fkey";

-- DropForeignKey
ALTER TABLE "booking_details" DROP CONSTRAINT "booking_details_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "booking_details" DROP CONSTRAINT "booking_details_passenger_id_fkey";

-- DropForeignKey
ALTER TABLE "booking_details" DROP CONSTRAINT "booking_details_seat_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_flight_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_return_flight_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_airline_id_fkey";

-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_arrival_airport_fkey";

-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_departure_airport_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_flight_id_fkey";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "airlines";

-- DropTable
DROP TABLE "airports";

-- DropTable
DROP TABLE "booking_details";

-- DropTable
DROP TABLE "bookings";

-- DropTable
DROP TABLE "flights";

-- DropTable
DROP TABLE "passengers";

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "seats";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "BookingStatus";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "NotificationType";

-- DropEnum
DROP TYPE "PassengerTitle";

-- DropEnum
DROP TYPE "PassengerType";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "SeatClass";

-- DropEnum
DROP TYPE "SeatStatus";

-- DropEnum
DROP TYPE "UserRole";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "discount" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "startdate" TIMESTAMP(6) NOT NULL,
    "enddate" TIMESTAMP(6) NOT NULL,
    "minpurchase" DECIMAL(10,2),
    "isactive" BOOLEAN NOT NULL DEFAULT true,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);
