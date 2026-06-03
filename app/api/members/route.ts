import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';

    const members = await prisma.member.findMany({
      where: {
        OR: [
          { nama: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ]
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(members);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ 
      message: "Gagal mengambil data member", 
      error: error.message 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { nama, email, noWa, alamat, kota, provinsi } = await req.json();

    if (!nama || !email) {
      return NextResponse.json({ message: "Nama dan Email wajib diisi" }, { status: 400 });
    }

    // Cek email sudah ada
    const existing = await prisma.member.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "Email sudah terdaftar" }, { status: 409 });
    }

    const member = await prisma.member.create({
      data: {
        nama,
        email,
        noWa,
        alamat,
        kota,
        provinsi,
      }
    });

    return NextResponse.json({ 
      message: "Member berhasil ditambahkan!", 
      member 
    }, { status: 201 });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ 
      message: "Gagal menambahkan member", 
      error: error.message 
    }, { status: 500 });
  }
}