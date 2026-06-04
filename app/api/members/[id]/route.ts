import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
    ) {
    try {
        const { id } = await params;

        const member = await prisma.member.findUnique({
        where: { id },
        select: {
            id: true,
            nama: true,
            email: true,
            noWa: true,
            alamat: true,
            kota: true,
            provinsi: true,
        },
        });

        if (!member) {
        return NextResponse.json(
            { message: "Member tidak ditemukan" },
            { status: 404 }
        );
        }

        return NextResponse.json(member);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
        { message: "Gagal mengambil data" },
        { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
    ) {
    try {
        const { id } = await params;
        const { nama, email, noWa, alamat, kota, provinsi } = await req.json();

        const member = await prisma.member.update({
        where: { id },
        data: { nama, email, noWa, alamat, kota, provinsi },
        });

        return NextResponse.json({
        message: "Data member berhasil diupdate",
        member,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
        { message: "Gagal mengupdate member" },
        { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
    ) {
    try {
        const { id } = await params;
        await prisma.member.delete({ where: { id } });
        return NextResponse.json({ message: "Member berhasil dihapus" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
        { message: "Gagal menghapus member" },
        { status: 500 }
        );
    }
}