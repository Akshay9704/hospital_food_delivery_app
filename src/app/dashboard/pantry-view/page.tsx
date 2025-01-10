"use client";

import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PantryLayout from "@/components/pantry-view/layout";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addPatientFormElements } from "@/helpers/formControls";

export default function ManagerDashboard() {
  const [patientList, setPatientList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

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

const [selectedDeliveryPerson, setSelectedDeliveryPerson] =
  React.useState<string | null>(null);
  return (
    <PantryLayout>
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
        {filteredPatients.map((patient: any) => {

          const handleDeliveryPersonClick = (deliveryPerson: string) => {
            console.log(`Delivery Person: ${deliveryPerson}`);
            setSelectedDeliveryPerson(deliveryPerson);
          };

          return (
            <div
              key={patient._id}
              className="bg-white p-4 rounded-md shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-500">
                Patient Name:{" "}
                <span className="text-black">{patient.patientName}</span>
              </h2>
              <p className="text-gray-500">
                Patient Age:{" "}
                <span className="text-black">{patient.patientAge}</span>
              </p>
              {/* Other patient details here */}
              <div className="mt-4">
                <h3 className="text-gray-500 text-sm">Delivery Persons:</h3>
                <div className="flex gap-2 mt-2">
                  {["John Doe", "Jane Smith", "Emily Davis"].map(
                    (deliveryPerson) => (
                      <Button
                        key={deliveryPerson}
                        onClick={() =>
                          handleDeliveryPersonClick(deliveryPerson)
                        }
                        className={`text-sm ${
                          selectedDeliveryPerson === deliveryPerson
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {deliveryPerson}
                      </Button>
                    )
                  )}
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <Button onClick={() => deletePatient(patient._id)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </PantryLayout>
  );
}
