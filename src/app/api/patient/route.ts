import { connect } from "@/dbConfig/dbConfig";
import Patient from "@/models/patientModel";
import { NextResponse, NextRequest } from "next/server";
import { Types } from "mongoose";

// GET ALL PATIENTS
export async function GET() {
  try {
    await connect();
    const patients = await Patient.find();
    return NextResponse.json({ patients }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch patients:", error);
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}

// ADD NEW PATIENT
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    await connect();
    const newPatient = new Patient(reqBody);
    await newPatient.save();
    return NextResponse.json(
      { message: "Patient added successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to add patient:", error);
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}

// UPDATE PATIENT
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientId, ...updateData } = body;

    if (!patientId || !Types.ObjectId.isValid(patientId)) {
      return NextResponse.json(
        { message: "Invalid or missing patient ID" },
        { status: 400 }
      );
    }

    await connect();

    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updateData,
      { new: true }
    );

    if (!updatedPatient) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Patient updated successfully", patient: updatedPatient },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update patient:", error);
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}

// DELETE PATIENT
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patientId");

    if (!patientId) {
      return NextResponse.json(
        { message: "Invalid or missing patient ID", success: false },
        { status: 400 }
      );
    }

    await connect();

    const deletedPatient = await Patient.findByIdAndDelete(
      new Types.ObjectId(patientId)
    );

    if (!deletedPatient) {
      return NextResponse.json(
        { message: "Patient not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Patient deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete patient:", error);
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
