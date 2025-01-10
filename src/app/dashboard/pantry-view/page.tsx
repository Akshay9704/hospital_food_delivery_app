"use client";

import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PantryLayout from "@/components/pantry-view/layout";
import { Button } from "@/components/ui/button";

export default function PantryDashboard() {
  const [patientList, setPatientList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showDelivery, setShowDelivery] = React.useState(false);

  const router = useRouter();

  const fetchPatientList = async () => {
    try {
      const response = await axios.get("/api/patient");
      setPatientList(response.data.patients);
    } catch (error) {
      console.error("Error fetching patient list", error);
    }
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

  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = React.useState<
    string | null
  >(null);
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = React.useState<
    string | null
  >(null);

  const handleDeliveryPersonClick = async (
    patientId: string,
    deliveryPerson: string
  ) => {
    try {
      const response = await axios.patch("/api/patient", {
        patientId,
        deliveryPerson,
      });
      console.log("Response from server:", response.data);
      toast.success("Delivery person assigned successfully");
      fetchPatientList();
      setSelectedDeliveryPerson(deliveryPerson);
      console.log("Updating patient:", { patientId, deliveryPerson });
    } catch (error) {
      console.error("Failed to update delivery person", error);
      toast.error("Failed to assign delivery person");
    }
  };

  const handleDeliveryStatusClick = async (
    patientId: string,
    deliveryStatus: string
  ) => {
    try {
      const response = await axios.patch("/api/patient", {
        patientId,
        deliveryStatus,
      });
      console.log("Response from server:", response.data);
      toast.success("Delivery status updated successfully");
      fetchPatientList();
      setSelectedDeliveryStatus(deliveryStatus);
      console.log("Updating patient:", { patientId, deliveryStatus });
    } catch (error) {
      console.error("Failed to update delivery status", error);
      toast.error("Failed to update delivery status");
    }
  };

  const deliveryRole = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "delivery") {
      setShowDelivery(true);
    } else {
      setShowDelivery(false);
    }
  };

  React.useEffect(() => {
    fetchPatientList();
    deliveryRole();
  }, []);

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
                Allergies:{" "}
                <span className="text-black">{patient.allergies}</span>
              </p>
              <p className="text-gray-500">
                Emergency Contact Name:{" "}
                <span className="text-black">
                  {patient.EmergencyContactName}
                </span>
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
                <span className="text-black">
                  {patient.DietChartMorningMeal}
                </span>
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
                <span className="text-black">
                  {patient.DietChartEveningMeal}
                </span>
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
              <div className="mt-4">
                {showDelivery ? (
                  <p className="text-gray-500 text-sm">
                    Delivery Person:{" "}
                    <span className="text-black">{patient.deliveryPerson}</span>
                  </p>
                ) : (
                  <div className="flex gap-2 mt-2">
                    {["Delivery", "Delivery1", "Delivery2"].map(
                      (deliveryPerson) => (
                        <Button
                          key={deliveryPerson}
                          onClick={() =>
                            handleDeliveryPersonClick(
                              patient._id,
                              deliveryPerson
                            )
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
                )}
              </div>
              {showDelivery ? (
                <div className="flex gap-2 mt-2">
                  {["In-Progress", "Delivered"].map((status) => (
                    <Button
                      key={status}
                      onClick={() =>
                      handleDeliveryStatusClick(patient._id, status)
                      }
                      className={`text-sm ${
                        selectedDeliveryStatus === status
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex gap-4 mt-4">
                  <Button onClick={() => deletePatient(patient._id)}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PantryLayout>
  );
}
