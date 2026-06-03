import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const member = await prisma.user.findUnique({
        where: { id: params.id },
        select: {
            id: true,
            name: true,
            email: true,
            noWa: true,
            alamat: true,
            kota: true,
            propinsi: true,
        }
        });

        if (!member) {
        return NextResponse.json({ message: "Member tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json(member);
    } catch (error) {
        return NextResponse.json({ message: "Gagal mengambil data" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { name, email, noWa, alamat, kota, propinsi } = await req.json();

        const member = await prisma.user.update({
        where: { id: params.id },
        data: { name, email, noWa, alamat, kota, propinsi }
        });

        return NextResponse.json({ 
        message: "Data member berhasil diupdate", 
        member 
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Gagal mengupdate member" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.user.delete({ where: { id: params.id } });
        return NextResponse.json({ message: "Member berhasil dihapus" });
    } catch (error) {
        return NextResponse.json({ message: "Gagal menghapus member" }, { status: 500 });
    }
}