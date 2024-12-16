/*
  Warnings:

  - You are about to drop the `discount` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('VERIFIED', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INFO', 'DISCOUNT', 'PROMO', 'EVENT', 'TRAVEL', 'BOOKING');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'BUYER');

-- CreateEnum
CREATE TYPE "SeatStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'LOCKED');

-- CreateEnum
CREATE TYPE "SeatClass" AS ENUM ('ECONOMY', 'FIRST', 'BUSINESS');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('ACTIVE', 'CANCELED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'UNPAID');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "PassengerTitle" AS ENUM ('Mr', 'Mrs');

-- CreateEnum
CREATE TYPE "PassengerType" AS ENUM ('BABY', 'CHILD', 'ADULT');

-- DropTable
DROP TABLE "discount";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "secret_key" TEXT NOT NULL DEFAULT '',
    "otp_token" TEXT NOT NULL DEFAULT '',
    "status" "UserStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "role" "UserRole" NOT NULL DEFAULT 'BUYER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "airlines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "imageId" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "airlines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "airports" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "elevation" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "imageId" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "airports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flights" (
    "id" SERIAL NOT NULL,
    "flight_number" TEXT NOT NULL,
    "airline_id" INTEGER NOT NULL,
    "departure_airport" INTEGER NOT NULL,
    "arrival_airport" INTEGER NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "terminal" TEXT NOT NULL,
    "information" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "class" "SeatClass" NOT NULL DEFAULT 'ECONOMY',

    CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" SERIAL NOT NULL,
    "flight_id" INTEGER NOT NULL,
    "seat_number" TEXT NOT NULL,
    "status" "SeatStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "flight_id" INTEGER NOT NULL,
    "return_flight_id" INTEGER,
    "booking_date" TIMESTAMP(3) NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_details" (
    "id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "passenger_id" INTEGER NOT NULL,
    "seat_id" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "payment_amount" DOUBLE PRECISION NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passengers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "identity_number" TEXT NOT NULL,
    "citizenship" TEXT NOT NULL,
    "country_of_issue" TEXT NOT NULL,
    "title" "PassengerTitle" NOT NULL DEFAULT 'Mr',
    "dob" TIMESTAMP(3) NOT NULL,
    "expired_Date" TIMESTAMP(3) NOT NULL,
    "type" "PassengerType" NOT NULL DEFAULT 'ADULT',

    CONSTRAINT "passengers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'INFO',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "minPurchase" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "booking_details_passenger_id_key" ON "booking_details"("passenger_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_booking_id_key" ON "payments"("booking_id");

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_airline_id_fkey" FOREIGN KEY ("airline_id") REFERENCES "airlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_departure_airport_fkey" FOREIGN KEY ("departure_airport") REFERENCES "airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_arrival_airport_fkey" FOREIGN KEY ("arrival_airport") REFERENCES "airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_return_flight_id_fkey" FOREIGN KEY ("return_flight_id") REFERENCES "flights"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_details" ADD CONSTRAINT "booking_details_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_details" ADD CONSTRAINT "booking_details_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "passengers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_details" ADD CONSTRAINT "booking_details_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
