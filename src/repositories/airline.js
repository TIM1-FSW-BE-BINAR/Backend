import { prisma } from '../database/db.js';

export class AirlineRepository {
  static async create(data) {
    const airline = await prisma.airline.create({
      data,
    });
    return airline;
  }

  static async update(airlineID, data) {
    const updatedAirline = await prisma.airline.update({
      where: {
        id: airlineID,
      },
      data,
    });
    return updatedAirline;
  }

  static async delete(airlineID) {
    const deletedAirline = await prisma.airline.delete({
      where: {
        id: airlineID,
      },
    });
    return deletedAirline;
  }

  static async deleteImage(imageKitId) {
    try {
      console.log(`Deleting image with ID: ${imageKitId}`);
      const response = await imagekit.deleteFile(imageKitId);
      return response;
    } catch (error) {
      console.error(`Error deleting image (ID: ${imageKitId}):`, error.message);
      if (error.response?.status === 404) {
        console.warn(`Image not found: ${imageKitId}`);
        return null;
      }
      throw error;
    }
  }

  static async findMany(pagination, filter, sorter) {
    const airlines = await prisma.airline.findMany({
      skip: pagination.offset,
      take: pagination.limit,
      where: filter,
      orderBy: sorter,
    });
    return airlines;
  }

  static async findByID(airlineID) {
    const airline = await prisma.airline.findUnique({
      where: {
        id: airlineID,
      },
    });
    return airline;
  }

  static async count(filter) {
    const totalAirlines = await prisma.airline.count({
      where: filter,
    });
    return totalAirlines;
  }

  static async findByName(name) {
    const airline = await prisma.airline.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    return airline;
  }
}