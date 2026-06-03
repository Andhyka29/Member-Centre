import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Silahkan isi semua field ya"}, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json({ message: "Email ini sudah terdaftar" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });

        return NextResponse.json({ 
            message: "Yeeys Register Berhasil",
            user: { id: user.id, name: user.name, email: user.email },
        }, { status: 201 });
    
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server nya bermasalah nih" }, { status: 500 });
    }
}