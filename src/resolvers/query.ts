import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Query = {
  organizations: async () => {
    return prisma.organization.findMany();
  },

  organizationBySlug: async (_: any, { slug }: { slug: string }) => {
    return prisma.organization.findUnique({
      where: { slug },
      include: { users: true, athletes: true, programs: true },
    });
  },

  usersByOrganization: async (_: any, { orgId }: { orgId: string }) => {
    return prisma.user.findMany({
      where: { organizationId: orgId },
    });
  },

  athletesByOrganization: async (_: any, { orgId }: { orgId: string }) => {
    return prisma.athlete.findMany({
      where: { organizationId: orgId },
      include: { attendanceRecords: true },
    });
  },

  sessionsByProgram: async (_: any, { programId }: { programId: string }) => {
    return prisma.session.findMany({
      where: { programId },
      include: { attendanceRecords: true },
    });
  },

  attendanceByAthlete: async (_: any, { athleteId }: { athleteId: string }) => {
    return prisma.attendanceRecord.findMany({
      where: { athleteId },
      include: { session: true, recordedBy: true },
      orderBy: { markedAt: "desc" },
    });
  },
};

export const Mutation = {
  createAthlete: async (
    _: any,
    {
      orgId,
      firstName,
      lastName,
      email,
      skillLevel,
    }: {
      orgId: string;
      firstName: string;
      lastName: string;
      email: string;
      skillLevel: "NONE" | "RECREATIONAL" | "INVITATIONAL" | "PROVINCIAL" | "NATIONAL" | "ELITE";
    }
  ) => {
    return prisma.athlete.create({
      data: {
        organizationId: orgId,
        firstName,
        lastName,
        email,
        skillLevel
      },
    });
  },

  createProgram: async (
    _: any,
    { orgId, name, sport }: { orgId: string; name: string; sport: string }
  ) => {
    return prisma.program.create({
      data: {
        organizationId: orgId,
        name,
        sport,
      },
    });
  },

  createSession: async (
    _: any,
    {
      programId,
      name,
      scheduledStart,
      scheduledEnd,
      organizationId,
      createdById,
    }: {
      programId: string;
      name: string;
      scheduledStart: Date;
      scheduledEnd: Date;
      organizationId: string;
      createdById: string;
    }
  ) => {
    return prisma.session.create({
      data: {
        programId,
        name,
        scheduledStart,
        scheduledEnd,
        organizationId,
        createdById,
      },
    });
  },

  markAttendance: async (
    _: any,
    {
      athleteId,
      sessionId,
      status,
      recordedById,
      organizationId,
    }: {
      athleteId: string;
      sessionId: string;
      status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED" | "PARTIAL";
      recordedById: string;
      organizationId: string;
    }
  ) => {
    return prisma.attendanceRecord.create({
      data: {
        athleteId,
        sessionId,
        status,
        recordedById,
        organizationId,
        markedAt: new Date(),
      },
    });
  },
};