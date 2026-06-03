import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Isi dulu semua field nya ya"}, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ message: "Email ini belum terdaftar nih"}, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Password nya salah"}, { status: 400 });
        }

        return NextResponse.json({ 
            message: "Yeeys Login Berhasil",
            user: {
                id: user.id,
                name: user.name,
                email: user.email   
            }
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server nya bermasalah nih"}, { status: 500 });
    }
}