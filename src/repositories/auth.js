import { prisma } from '../database/db.js';
import { UserStatus, UserRole } from '@prisma/client';
import { Bcrypt } from '../utils/bcrypt.js';

export class AuthRepository {
  /**
   * @param {string} email
   */
  static async findByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  static async getUserStatusEnum() {
    return UserStatus;
  }

  /**
   *
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} phone
   * @param {string} password
   * @param {number} id
   */
  static async update(firstName, lastName, phone, password, id) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        phone,
        password: await Bcrypt.hash(password),
      },
    });
  }

  static async newUser(firstName, lastName, phone, email, password) {
    return await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        password: await Bcrypt.hash(password),
        status: UserStatus.UNVERIFIED,
        role: UserRole.BUYER,
      },
    });
  }

  static async setSecretKey(token, id) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        secretKey: token,
      },
    });
  }

  /**
   *
   * @param {number} id
   */

  static async findUserById(id) {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  /**
   *
   * @param {string} otp
   * @param {number} id
   */

  static async setOtp(otp, id) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        otpToken: otp,
      },
    });
  }

  /**
   *
   * @param {string} secret
   */
  static async getUserBySecret(secret) {
    return await prisma.user.findFirst({
      where: {
        secretKey: secret,
      },
    });
  }

  /**
   *
   * @param {number} id
   */

  static async setUserVerified(id) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        status: UserStatus.VERIFIED,
      },
    });
  }

  static async setNewPassword(id, password) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: await Bcrypt.hash(password),
      },
    });
  }
}
