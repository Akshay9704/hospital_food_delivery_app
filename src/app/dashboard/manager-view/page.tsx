"use client";

import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ManagerLayout from "@/components/manager-view/layout";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addPatientFormElements } from "@/helpers/formControls";

const initialFormData = {
  patientId: "",
  patientName: "",
  diseases: "",
  allergies: "",
  patientAge: "",
  roomNumber: "",
  bedNumber: "",
  floorNumber: "",
  patientGender: "",
  contact: "",
  EmergencyContactName: "",
  EmergencyContactNumber: "",
  EmergencyContactRelation: "",
  DietChartMorningMeal: "",
  DietChartMorningIngredients: "",
  DietChartMorningInstructions: "",
  DietChartEveningMeal: "",
  DietChartEveningIngredients: "",
  DietChartEveningInstructions: "",
  DietChartNightMeal: "",
  DietChartNightIngredients: "",
  DietChartNightInstructions: "",
  assignedStaff: "",
};

export default function ManagerDashboard() {
  const [formData, setFormData] = React.useState(initialFormData);
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    React.useState(false);
  const [patientList, setPatientList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);

  const router = useRouter();

  const fetchPatientList = async () => {
    try {
      const response = await axios.get("/api/patient");
      setPatientList(response.data.patients);
    } catch (error) {
      console.error("Error fetching patient list", error);
    }
  };

  React.useEffect(() => {
    fetchPatientList();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        if (!formData.patientId) {
          toast.error("Patient ID is missing.");
          return;
        }
        await axios.patch("/api/patient", formData);
        toast.success("Patient updated successfully");
      } else {
        await axios.post("/api/patient", formData);
        toast.success("Patient added successfully");
      }
      fetchPatientList();
      setOpenCreateProductsDialog(false);
      setFormData(initialFormData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Error submitting form");
    }
  };

  const editPatient = (patient: any) => {
    setFormData({
      patientId: patient._id,
      ...patient,
    });
    setIsEditing(true);
    setOpenCreateProductsDialog(true);
  };

  const deletePatient = async (patientId: string) => {
    try {
      await axios.delete(`/api/patient?patientId=${patientId}`);
      toast.success("Patient deleted successfully");
      fetchPatientList();
    } catch (error) {
      console.error("Error deleting patient", error);
      toast.error("Error deleting patient");
    }
  };

  const filteredPatients = patientList.filter((patient: any) =>
    patient.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewPatientDetails = (patientId: string) => {
    router.push(`/view-patient-details?id=${patientId}`);
  };

  return (
    <ManagerLayout>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Patient
        </Button>
      </div>

      <div className="mb-5 w-full">
        <input
          type="text"
          placeholder="Search by patient name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredPatients.map((patient: any) => (
          <div key={patient._id} className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-500">
              Patient Name:{" "}
              <span className="text-black">{patient.patientName}</span>
            </h2>
            <p className="text-gray-500">
              Patient Age:{" "}
              <span className="text-black">{patient.patientAge}</span>
            </p>
            <p className="text-gray-500">
              Patient Gender:{" "}
              <span className="text-black">{patient.patientGender}</span>
            </p>
            <p className="text-gray-500">
              Room Number:{" "}
              <span className="text-black">{patient.roomNumber}</span>
            </p>
            <p className="text-gray-500">
              Bed Number:{" "}
              <span className="text-black">{patient.bedNumber}</span>
            </p>
            <p className="text-gray-500">
              Floor Number:{" "}
              <span className="text-black">{patient.floorNumber}</span>
            </p>
            <p className="text-gray-500">
              Contact: <span className="text-black">{patient.contact}</span>
            </p>
            <p className="text-gray-500">
              Assigned Staff:{" "}
              <span className="text-white bg-black py-1 px-2 rounded-md">
                {patient.assignedStaff}
              </span>
            </p>
            <p className="text-gray-500">
              Diseases: <span className="text-black">{patient.diseases}</span>
            </p>
            <p className="text-gray-500">
              Allergies: <span className="text-black">{patient.allergies}</span>
            </p>
            <p className="text-gray-500">
              Emergency Contact Name:{" "}
              <span className="text-black">{patient.EmergencyContactName}</span>
            </p>
            <p className="text-gray-500">
              Emergency Contact Number:{" "}
              <span className="text-black">
                {patient.EmergencyContactNumber}
              </span>
            </p>
            <p className="text-gray-500">
              Emergency Contact Relation:{" "}
              <span className="text-black">
                {patient.EmergencyContactRelation}
              </span>
            </p>
            <p className="text-gray-500">
              Diet Chart Morning Meal:{" "}
              <span className="text-black">{patient.DietChartMorningMeal}</span>
            </p>
            <p className="text-gray-500">
              Diet Chart Morning Ingredients:{" "}
              <span className="text-black">
                {patient.DietChartMorningIngredients}
              </span>
            </p>
            <p className="text-gray-500">
              Diet Chart Morning Instructions:{" "}
              <span className="text-black">
                {patient.DietChartMorningInstructions}
              </span>
            </p>
            <p className="text-gray-500">
              Diet Chart Evening Meal:{" "}
              <span className="text-black">{patient.DietChartEveningMeal}</span>
            </p>
            <p className="text-gray-500">
              Diet Chart Evening Ingredients:{" "}
              <span className="text-black">
                {patient.DietChartEveningIngredients}
              </span>
            </p>
            <p className="text-gray-500">
              Diet Chart Evening Instructions:{" "}
              <span className="text-black">
                {patient.DietChartEveningInstructions}
              </span>
            </p>
            <p className="text-gray-500">
              Diet Chart Night Meal:{" "}
              <span className="text-black">{patient.DietChartNightMeal}</span>
            </p>
            <p className="text-gray-500">
              Diet Chart Night Ingredients:{" "}
              <span className="text-black">
                {patient.DietChartNightIngredients}
              </span>
            </p>
            <p className="text-gray-500">
              Diet Chart Night Instructions:{" "}
              <span className="text-black">
                {patient.DietChartNightInstructions}
              </span>
            </p>
            <div className="flex gap-4 mt-4">
              <Button onClick={() => editPatient(patient)}>Edit</Button>
              <Button onClick={() => deletePatient(patient._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setIsEditing(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {isEditing ? "Edit Patient" : "Add New Patient"}
            </SheetTitle>
            <p className="text-red-500 font-semibold text-xs">*Required</p>
          </SheetHeader>
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={isEditing ? "Update Patient" : "Add Patient"}
              formControls={addPatientFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </ManagerLayout>
  );
}
