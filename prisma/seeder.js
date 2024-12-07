import { parseISO } from 'date-fns';
import { prisma } from '../src/database/db.js';
import { Bcrypt } from '../src/utils/bcrypt.js';
import { UserRole, UserStatus } from '@prisma/client';

async function main() {
  // seed users
  const defaultPasswordHash = await Bcrypt.hash('password');

  // Seed Users with varied roles and statuses
  await prisma.user.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+62812345678',
        password: defaultPasswordHash,
        secretKey: '',
        otpToken: '',
        status: UserStatus.VERIFIED,
        role: UserRole.BUYER,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+62887654321',
        password: defaultPasswordHash,
        secretKey: '',
        otpToken: '',
        status: UserStatus.VERIFIED,
        role: UserRole.ADMIN,
      },
      {
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@example.com',
        phone: '+62811223344',
        password: defaultPasswordHash,
        secretKey: '',
        otpToken: '',
        status: UserStatus.UNVERIFIED,
        role: UserRole.BUYER,
      },
      {
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@example.com',
        phone: '+62822334455',
        password: defaultPasswordHash,
        secretKey: '',
        otpToken: '',
        status: UserStatus.VERIFIED,
        role: UserRole.BUYER.VERIFIED,
      },
      {
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@example.com',
        phone: '+62833445566',
        password: defaultPasswordHash,
        secretKey: '',
        otpToken: '',
        status: UserStatus.VERIFIED,
        role: UserRole.BUYER,
      },
      {
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@example.com',
        phone: '+62844556677',
        password: defaultPasswordHash,
        secretKey: '',
        otpToken: '',
        status: UserStatus.VERIFIED,
        role: UserRole.BUYER,
      },
    ],
    skipDuplicates: true,
  });

  // Seed Airlines
  await prisma.airline.createMany({
    data: [
      {
        name: 'Garuda Indonesia',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airlines/Garuda-Indonesia.jpg?updatedAt=1733030015025',
        imageId: 'garuda-logo',
      },
      {
        name: 'Singapore Airlines',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airlines/singapore-airline.png?updatedAt=1733030014987',
        imageId: 'sia-logo',
      },
      {
        name: 'Qatar Airways',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airlines/qatar%20airways.png?updatedAt=1733030014946',
        imageId: 'qatar-logo',
      },
      {
        name: 'Emirates',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airlines/emirates.png?updatedAt=1733030014808',
        imageId: 'emirates-logo',
      },
      {
        name: 'Qantas',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airlines/qantas.jpg?updatedAt=1733030014904',
        imageId: 'qantas-logo',
      },
      {
        name: 'Delta Airlines',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airlines/delta%20airlines.png?updatedAt=1733030297967',
        imageId: 'delta-logo',
      },
      {
        name: 'Lion Air',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airlines/lion-air.png?updatedAt=1733030014852',
        imageId: 'lion-logo',
      },
      {
        name: 'AirAsia',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airlines/air%20asia.png?updatedAt=1733030014916',
        imageId: 'airasia-logo',
      },
    ],
  });

  // Seed Airports
  await prisma.airport.createMany({
    data: [
      // Indonesia
      {
        code: 'CGK',
        name: 'Soekarno-Hatta International Airport',
        city: 'Jakarta',
        state: 'Asia',
        country: 'Indonesia',
        timezone: 'Asia/Jakarta',
        latitude: '-6.1255',
        longitude: '106.6551',
        elevation: '8',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/jakarta.jpg?updatedAt=1733579567527',
      },
      {
        code: 'SUB',
        name: 'Juanda International Airport',
        city: 'Surabaya',
        state: 'Asia',
        country: 'Indonesia',
        timezone: 'Asia/Jakarta',
        latitude: '-7.3797',
        longitude: '112.7876',
        elevation: '7',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/surabaya.jpg?updatedAt=1733579567180',
      },
      {
        code: 'DPS',
        name: 'Ngurah Rai International Airport',
        city: 'Denpasar',
        state: 'Asia',
        country: 'Indonesia',
        timezone: 'Asia/Makassar',
        latitude: '-8.7487',
        longitude: '115.1670',
        elevation: '4',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/bali.jpg?updatedAt=1733579567375',
      },
      // International Airports
      {
        code: 'SIN',
        name: 'Singapore Changi Airport',
        city: 'Singapore',
        state: 'Asia',
        country: 'Singapore',
        timezone: 'Asia/Singapore',
        latitude: '1.3644',
        longitude: '103.9915',
        elevation: '22',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/singapura.jpg?updatedAt=1733579566914',
      },
      {
        code: 'DOH',
        name: 'Hamad International Airport',
        city: 'Doha',
        state: 'Asia',
        country: 'Qatar',
        timezone: 'Asia/Qatar',
        latitude: '25.2654',
        longitude: '51.6066',
        elevation: '5',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/doha.jpg?updatedAt=1733579567564',
      },
      {
        code: 'HKG',
        name: 'Hong Kong International Airport',
        city: 'Chek Lap Kok',
        state: 'Asia',
        country: 'Hong Kong',
        timezone: 'Asia/Hong_Kong',
        latitude: '22.308046',
        longitude: '113.918480',
        elevation: '5',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/hongkong.jpg?updatedAt=1733579787581',
      },
      {
        code: 'JED',
        name: 'King Abdulaziz International Airport',
        city: 'Jeddah',
        state: 'Asia',
        country: 'Saudi Arabia',
        timezone: 'Asia/Riyadh',
        latitude: '21.6820',
        longitude: '39.1606',
        elevation: '5',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/jeddah.jpg?updatedAt=1733579567636',
      },
      {
        code: 'DXB',
        name: 'Dubai International Airport',
        city: 'Dubai',
        state: 'Asia',
        country: 'United Arab Emirates',
        timezone: 'Asia/Dubai',
        latitude: '25.276987',
        longitude: '55.296249',
        elevation: '2',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/dubai.jpg?updatedAt=1733579787752',
      },
      {
        code: 'LAX',
        name: 'Los Angeles International Airport',
        city: 'Los Angeles',
        state: 'America',
        country: 'United States',
        timezone: 'America/Los_Angeles',
        latitude: '33.9416',
        longitude: '-118.4085',
        elevation: '38',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/los%20angeles.jpg?updatedAt=1733579570744',
      },
      {
        code: 'JFK',
        name: 'John F. Kennedy International Airport',
        city: 'New York',
        state: 'America',
        country: 'United States',
        timezone: 'America/Los_Angeles',
        latitude: '40.6446',
        longitude: '-73.780968',
        elevation: '38',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/new%20york.jpg?updatedAt=1733579787735',
      },
      {
        code: 'SYD',
        name: 'Sydney Kingsford Smith Airport',
        city: 'Sydney',
        state: 'Australia',
        country: 'Australia',
        timezone: 'Australia/Sydney',
        latitude: '-33.9399',
        longitude: '151.1753',
        elevation: '6',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/sidney.jpg?updatedAt=1733579567038',
      },
      {
        code: 'LHR',
        name: 'London Heathrow Airport',
        city: 'London',
        state: 'Europe',
        country: 'United Kingdom',
        timezone: 'Europe/London',
        latitude: '51.4700',
        longitude: '-0.4543',
        elevation: '83 ft',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/london.jpg?updatedAt=1733579570646',
        imageId: 'lhr123',
      },
      {
        code: 'CDG',
        name: 'Charles de Gaulle Airport',
        city: 'Paris',
        state: 'Europe',
        country: 'France',
        timezone: 'Europe/Paris',
        latitude: '49.0097',
        longitude: '2.5479',
        elevation: '392 ft',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/paris.jpg?updatedAt=1733579567152',
        imageId: 'cdg123',
      },
      {
        code: 'FRA',
        name: 'Frankfurt Airport',
        city: 'Frankfurt',
        state: 'Europe',
        country: 'Germany',
        timezone: 'Europe/Berlin',
        latitude: '50.0379',
        longitude: '8.5622',
        elevation: '364 ft',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/frankfurt.jpg?updatedAt=1733579567397',
        imageId: 'fra123',
      },
      {
        code: 'JNB',
        name: 'O. R. Tambo International Airport',
        city: 'Johannesburg',
        state: 'Africa',
        country: 'South Africa',
        timezone: 'Africa/Johannesburg',
        latitude: '-26.1419',
        longitude: '28.2421',
        elevation: '1677',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/johannesburg.jpg?updatedAt=1733579570067',
        imageId: '',
        createdAt: new Date(),
      },
      {
        code: 'CAI',
        name: 'Cairo International Airport',
        city: 'Cairo',
        state: 'Africa',
        country: 'Egypt',
        timezone: 'Africa/Cairo',
        latitude: '30.1219',
        longitude: '31.4057',
        elevation: '113',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/cairo.jpg?updatedAt=1733579567441',
        imageId: '',
        createdAt: new Date(),
      },
      {
        code: 'LOS',
        name: 'Murtala Muhammed International Airport',
        city: 'Lagos',
        state: 'Africa',
        country: 'Nigeria',
        timezone: 'Africa/Lagos',
        latitude: '6.5775',
        longitude: '3.3213',
        elevation: '35',
        imageUrl:
          'https://ik.imagekit.io/vieryn/airports/lagos.jpg?updatedAt=1733579570200',
        imageId: '',
        createdAt: new Date(),
      },
    ],
  });

  // Retrieve airline and airport IDs for creating flights
  const retrievedAirlines = await prisma.airline.findMany();
  const retrievedAirports = await prisma.airport.findMany();

  // Seed Flights
  await prisma.flight.createMany({
    data: [
      // Jakarta to Singapore
      {
        flightNumber: 'HA113',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SUB').id,
        departureTime: parseISO('2024-12-15T08:00:00Z'),
        arrivalTime: parseISO('2024-12-15T11:00:00Z'),
        terminal: 'A',
        information: 'Direct flight from Jakarta to Surabaya',
        price: 550.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'HA114',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SUB').id,
        departureTime: parseISO('2024-12-16T09:00:00Z'),
        arrivalTime: parseISO('2024-12-16T12:00:00Z'),
        terminal: 'A',
        information: 'Direct flight from Jakarta to Surabaya',
        price: 550.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'HA115',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SUB').id,
        departureTime: parseISO('2024-12-16T09:00:00Z'),
        arrivalTime: parseISO('2024-12-16T11:00:00Z'),
        terminal: 'B',
        information: 'Direct flight from Jakarta to Surabaya',
        price: 950.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'HA119',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SUB').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-16T09:00:00Z'),
        arrivalTime: parseISO('2024-12-16T11:00:00Z'),
        terminal: 'C',
        information: 'Direct flight from Surabaya to Jakarta',
        price: 950.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'HA129',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SUB').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-17T05:00:00Z'),
        arrivalTime: parseISO('2024-12-17T08:00:00Z'),
        terminal: 'C',
        information: 'Direct flight from Surabaya to Jakarta',
        price: 950.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'HA139',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SUB').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-17T05:00:00Z'),
        arrivalTime: parseISO('2024-12-17T08:00:00Z'),
        terminal: 'C',
        information: 'Direct flight from Surabaya to Jakarta',
        price: 450.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'HA131',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SUB').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-18T05:00:00Z'),
        arrivalTime: parseISO('2024-12-18T08:00:00Z'),
        terminal: 'C',
        information: 'Direct flight from Surabaya to Jakarta',
        price: 450.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'HA137',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SUB').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-18T05:30:00Z'),
        arrivalTime: parseISO('2024-12-18T08:00:00Z'),
        terminal: 'C',
        information: 'Direct flight from Surabaya to Jakarta',
        price: 550.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'GA123',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        departureTime: parseISO('2024-12-15T08:00:00Z'),
        arrivalTime: parseISO('2024-12-15T11:00:00Z'),
        terminal: 'A',
        information: 'Direct flight from Jakarta to Singapore',
        price: 850.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'GA121',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        departureTime: parseISO('2024-12-23T08:00:00Z'),
        arrivalTime: parseISO('2024-12-23T11:00:00Z'),
        terminal: 'A',
        information: 'Direct flight from Jakarta to Singapore',
        price: 850.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'GA120',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        departureTime: parseISO('2024-12-23T09:00:00Z'),
        arrivalTime: parseISO('2024-12-23T12:00:00Z'),
        terminal: 'A',
        information: 'Direct flight from Jakarta to Singapore',
        price: 1000.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'GA119',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        departureTime: parseISO('2024-12-23T05:00:00Z'),
        arrivalTime: parseISO('2024-12-23T08:00:00Z'),
        terminal: 'A',
        information: 'Direct flight from Jakarta to Singapore',
        price: 1000.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'GA118',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        departureTime: parseISO('2024-12-24T05:00:00Z'),
        arrivalTime: parseISO('2024-12-24T08:00:00Z'),
        terminal: 'A',
        information: 'Direct flight from Jakarta to Singapore',
        price: 1000.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'GA117',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        departureTime: parseISO('2024-12-10T05:00:00Z'),
        arrivalTime: parseISO('2024-12-10T08:00:00Z'),
        terminal: 'A',
        information: 'Direct flight from Jakarta to Singapore',
        price: 1000.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'GA116',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        departureTime: parseISO('2024-12-10T04:00:00Z'),
        arrivalTime: parseISO('2024-12-10T08:00:00Z'),
        terminal: 'A',
        information: 'Direct flight from Jakarta to Singapore',
        price: 500.0,
        class: 'ECONOMY',
      },
      // Singapore to Jakarta
      {
        flightNumber: 'SQ456',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-16T14:30:00Z'),
        arrivalTime: parseISO('2024-12-16T17:30:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 900.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'SQ455',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-17T14:30:00Z'),
        arrivalTime: parseISO('2024-12-17T17:30:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 500.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'SQ454',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-16T14:30:00Z'),
        arrivalTime: parseISO('2024-12-16T17:30:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 500.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'SQ453',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-18T14:30:00Z'),
        arrivalTime: parseISO('2024-12-18T17:30:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 500.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'SQ452',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-19T14:30:00Z'),
        arrivalTime: parseISO('2024-12-19T17:30:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 500.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'SQ450',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-20T15:30:00Z'),
        arrivalTime: parseISO('2024-12-20T17:30:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 800.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'SQ457',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-16T14:30:00Z'),
        arrivalTime: parseISO('2024-12-16T17:30:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 900.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'SQ460',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-17T14:30:00Z'),
        arrivalTime: parseISO('2024-12-17T17:30:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 900.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'SQ411',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-18T14:30:00Z'),
        arrivalTime: parseISO('2024-12-18T17:00:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 1000.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'SQ458',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-16T14:30:00Z'),
        arrivalTime: parseISO('2024-12-16T17:30:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 900.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'SQ401',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-16T11:30:00Z'),
        arrivalTime: parseISO('2024-12-16T12:30:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 1100.0,
        class: 'FIRST',
      },
      // Surabaya to Doha
      {
        flightNumber: 'QR777',
        airlineId: retrievedAirlines.find((a) => a.name === 'Qatar Airways').id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SUB').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'DOH').id,
        departureTime: parseISO('2024-12-17T22:00:00Z'),
        arrivalTime: parseISO('2024-12-18T01:30:00Z'),
        terminal: 'B',
        information: 'International flight from Surabaya to Doha',
        price: 1200.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'QR717',
        airlineId: retrievedAirlines.find((a) => a.name === 'Qatar Airways').id,
        departureAirport: retrievedAirports.find((a) => a.code === 'JNB').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CAI').id,
        departureTime: parseISO('2024-12-17T22:00:00Z'),
        arrivalTime: parseISO('2024-12-18T00:30:00Z'),
        terminal: 'A',
        information: 'International flight from Johannsenburg to Cairo',
        price: 1200.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'QR719',
        airlineId: retrievedAirlines.find((a) => a.name === 'Qatar Airways').id,
        departureAirport: retrievedAirports.find((a) => a.code === 'JNB').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CAI').id,
        departureTime: parseISO('2024-12-17T22:00:00Z'),
        arrivalTime: parseISO('2024-12-18T00:30:00Z'),
        terminal: 'A',
        information: 'International flight from Johannsenburg to Cairo',
        price: 1200.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'QR718',
        airlineId: retrievedAirlines.find((a) => a.name === 'Qatar Airways').id,
        departureAirport: retrievedAirports.find((a) => a.code === 'JNB').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CAI').id,
        departureTime: parseISO('2024-12-18T23:00:00Z'),
        arrivalTime: parseISO('2024-12-19T01:30:00Z'),
        terminal: 'A',
        information: 'International flight from Johannsenburg to Cairo',
        price: 1200.0,
        class: 'FIRST',
      },
      // Jakarta to Singapore
      {
        flightNumber: 'GA193',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        departureTime: parseISO('2024-12-15T08:00:00Z'),
        arrivalTime: parseISO('2024-12-15T11:00:00Z'),
        terminal: 'A',
        information: 'Direct flight from Jakarta to Singapore',
        price: 850.0,
        class: 'ECONOMY',
      },
      // Singapore to Jakarta
      {
        flightNumber: 'SQ451',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-16T14:30:00Z'),
        arrivalTime: parseISO('2024-12-16T17:30:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 900.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'SQ121',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-12-16T14:30:00Z'),
        arrivalTime: parseISO('2024-12-16T17:30:00Z'),
        terminal: 'C',
        information: 'Return flight from Singapore to Jakarta',
        price: 900.0,
        class: 'BUSINESS',
      },
      // Surabaya to Doha
      {
        flightNumber: 'QR789',
        airlineId: retrievedAirlines.find((a) => a.name === 'Qatar Airways').id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SUB').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'DOH').id,
        departureTime: parseISO('2024-12-17T22:00:00Z'),
        arrivalTime: parseISO('2024-12-18T01:30:00Z'),
        terminal: 'B',
        information: 'International flight from Surabaya to Doha',
        price: 1200.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'NY789',
        airlineId: retrievedAirlines.find((a) => a.name === 'Qatar Airways').id,
        departureAirport: retrievedAirports.find((a) => a.code === 'JFK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'DOH').id,
        departureTime: parseISO('2024-12-17T22:00:00Z'),
        arrivalTime: parseISO('2024-12-18T03:30:00Z'),
        terminal: 'B',
        information: 'International flight from New York to Doha',
        price: 1200.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'NY790',
        airlineId: retrievedAirlines.find((a) => a.name === 'Qatar Airways').id,
        departureAirport: retrievedAirports.find((a) => a.code === 'DOH').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'JFK').id,
        departureTime: parseISO('2024-12-18T22:00:00Z'),
        arrivalTime: parseISO('2024-12-19T03:30:00Z'),
        terminal: 'B',
        information: 'International flight from Doho to New York',
        price: 1200.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'NY791',
        airlineId: retrievedAirlines.find((a) => a.name === 'Qatar Airways').id,
        departureAirport: retrievedAirports.find((a) => a.code === 'DOH').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'JFK').id,
        departureTime: parseISO('2024-12-19T22:00:00Z'),
        arrivalTime: parseISO('2024-12-20T03:30:00Z'),
        terminal: 'B',
        information: 'International flight from Doho to New York',
        price: 1200.0,
        class: 'FIRST',
      },
      // Additional flight data, to meet the required 50 flights
      {
        flightNumber: 'GA124',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'LHR').id,
        departureTime: parseISO('2024-12-15T15:00:00Z'),
        arrivalTime: parseISO('2024-12-15T22:00:00Z'),
        terminal: 'D',
        information: 'Jakarta to London via direct flight',
        price: 1400.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'SQ789',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'FRA').id,
        departureTime: parseISO('2024-12-16T10:00:00Z'),
        arrivalTime: parseISO('2024-12-16T16:00:00Z'),
        terminal: 'E',
        information: 'Singapore to Frankfurt flight',
        price: 1050.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'QR100',
        airlineId: retrievedAirlines.find((a) => a.name === 'Qatar Airways').id,
        departureAirport: retrievedAirports.find((a) => a.code === 'DOH').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'JNB').id,
        departureTime: parseISO('2024-12-17T23:30:00Z'),
        arrivalTime: parseISO('2024-12-18T06:00:00Z'),
        terminal: 'A',
        information: 'Qatar Airways flight from Doha to Johannesburg',
        price: 1250.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'QR101',
        airlineId: retrievedAirlines.find((a) => a.name === 'Qatar Airways').id,
        departureAirport: retrievedAirports.find((a) => a.code === 'DOH').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'JNB').id,
        departureTime: parseISO('2024-12-16T23:30:00Z'),
        arrivalTime: parseISO('2024-12-17T06:00:00Z'),
        terminal: 'A',
        information: 'Qatar Airways flight from Doha to Johannesburg',
        price: 1250.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'EM206',
        airlineId: retrievedAirlines.find((a) => a.name === 'Emirates').id,
        departureAirport: retrievedAirports.find((a) => a.code === 'DXB').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SYD').id,
        departureTime: parseISO('2024-12-18T18:00:00Z'),
        arrivalTime: parseISO('2024-12-19T17:30:00Z'),
        terminal: '3',
        information: 'Direct flight from Dubai to Sydney',
        price: 1600.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'QF2',
        airlineId: retrievedAirlines.find((a) => a.name === 'Qantas').id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SYD').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'LAX').id,
        departureTime: parseISO('2024-12-19T22:00:00Z'),
        arrivalTime: parseISO('2024-12-20T18:00:00Z'),
        terminal: '1',
        information: 'Sydney to Los Angeles with Qantas',
        price: 1900.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'DL5',
        airlineId: retrievedAirlines.find((a) => a.name === 'Delta Airlines')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'LAX').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'JFK').id,
        departureTime: parseISO('2024-12-20T07:30:00Z'),
        arrivalTime: parseISO('2024-12-20T15:00:00Z'),
        terminal: '2',
        information: 'Los Angeles to New York City flight',
        price: 400.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'DL6',
        airlineId: retrievedAirlines.find((a) => a.name === 'Delta Airlines')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'JFK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'LAX').id,
        departureTime: parseISO('2024-12-20T07:30:00Z'),
        arrivalTime: parseISO('2024-12-20T15:00:00Z'),
        terminal: '2',
        information: 'New York City toLos Angeles flight',
        price: 400.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'DL9',
        airlineId: retrievedAirlines.find((a) => a.name === 'Delta Airlines')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'JFK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'LAX').id,
        departureTime: parseISO('2024-12-20T01:30:00Z'),
        arrivalTime: parseISO('2024-12-20T06:00:00Z'),
        terminal: '2',
        information: 'New York City toLos Angeles flight',
        price: 550.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'GA300',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'HKG').id,
        departureTime: parseISO('2024-12-20T09:30:00Z'),
        arrivalTime: parseISO('2024-12-20T14:00:00Z'),
        terminal: 'A',
        information: 'Jakarta to Hong Kong direct flight',
        price: 1050.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'GA301',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'HKG').id,
        departureTime: parseISO('2024-12-20T09:30:00Z'),
        arrivalTime: parseISO('2024-12-20T14:00:00Z'),
        terminal: 'A',
        information: 'Jakarta to Hong Kong direct flight',
        price: 1050.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'GA200',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'HKG').id,
        departureTime: parseISO('2024-12-20T09:30:00Z'),
        arrivalTime: parseISO('2024-12-20T14:00:00Z'),
        terminal: 'A',
        information: 'Jakarta to Hong Kong direct flight',
        price: 700.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'GA201',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'HKG').id,
        departureTime: parseISO('2024-12-20T09:30:00Z'),
        arrivalTime: parseISO('2024-12-20T14:00:00Z'),
        terminal: 'A',
        information: 'Jakarta to Hong Kong direct flight',
        price: 1300.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'GA202',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'HKG').id,
        departureTime: parseISO('2024-12-20T09:30:00Z'),
        arrivalTime: parseISO('2024-12-20T14:00:00Z'),
        terminal: 'A',
        information: 'Jakarta to Hong Kong direct flight',
        price: 1000.0,
        class: 'BUSINESS',
      },
      {
        flightNumber: 'GA201',
        airlineId: retrievedAirlines.find((a) => a.name === 'Garuda Indonesia')
          .id,
        departureAirport: retrievedAirports.find((a) => a.code === 'HKG').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CGK').id,
        departureTime: parseISO('2024-08-20T09:30:00Z'),
        arrivalTime: parseISO('2024-08-20T14:00:00Z'),
        terminal: 'A',
        information: 'Hong Kong to Jakarta direct flight',
        price: 700.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'SQ123',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'DXB').id,
        departureTime: parseISO('2024-12-21T14:00:00Z'),
        arrivalTime: parseISO('2024-12-21T20:30:00Z'),
        terminal: 'B',
        information: 'Singapore to Dubai flight with Singapore Airlines',
        price: 1100.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'DS191',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'DXB').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'SIN').id,
        departureTime: parseISO('2024-09-21T14:00:00Z'),
        arrivalTime: parseISO('2024-09-21T20:30:00Z'),
        terminal: 'B',
        information: 'Dubai to Singapore flight with Singapore Airlines',
        price: 1100.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'PR124',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'LHR').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'CDG').id,
        departureTime: parseISO('2024-12-21T14:00:00Z'),
        arrivalTime: parseISO('2024-12-21T20:30:00Z'),
        terminal: 'B',
        information: 'London to Paris flight with Singapore Airlines',
        price: 1100.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'PR123',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CDG').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'LHR').id,
        departureTime: parseISO('2024-08-21T14:00:00Z'),
        arrivalTime: parseISO('2024-08-21T20:30:00Z'),
        terminal: 'B',
        information: 'Paris to London flight with Singapore Airlines',
        price: 500.0,
        class: 'ECONOMY',
      },
      {
        flightNumber: 'PR110',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CDG').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'LHR').id,
        departureTime: parseISO('2024-08-21T14:00:00Z'),
        arrivalTime: parseISO('2024-08-21T19:45:00Z'),
        terminal: 'B',
        information: 'Paris to London flight with Singapore Airlines',
        price: 900.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'PR1',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CDG').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'LHR').id,
        departureTime: parseISO('2024-08-21T08:00:00Z'),
        arrivalTime: parseISO('2024-08-21T14:45:00Z'),
        terminal: 'B',
        information: 'Paris to London flight with Singapore Airlines',
        price: 900.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'PR2',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CDG').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'LHR').id,
        departureTime: parseISO('2024-08-21T09:00:00Z'),
        arrivalTime: parseISO('2024-08-21T15:45:00Z'),
        terminal: 'B',
        information: 'Paris to London flight with Singapore Airlines',
        price: 900.0,
        class: 'FIRST',
      },
      {
        flightNumber: 'PR3',
        airlineId: retrievedAirlines.find(
          (a) => a.name === 'Singapore Airlines'
        ).id,
        departureAirport: retrievedAirports.find((a) => a.code === 'CDG').id,
        arrivalAirport: retrievedAirports.find((a) => a.code === 'LHR').id,
        departureTime: parseISO('2024-08-16T22:00:00Z'),
        arrivalTime: parseISO('2024-08-17T03:45:00Z'),
        terminal: 'B',
        information: 'Paris to London flight with Singapore Airlines',
        price: 900.0,
        class: 'FIRST',
      },
    ],
  });

  console.log('Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
