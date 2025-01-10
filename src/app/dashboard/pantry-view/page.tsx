import React from "react";
import axios, { AxiosError } from "axios"; 
import toast from "react-hot-toast";
import PantryLayout from "@/components/pantry-view/layout";
import { Button } from "@/components/ui/button";

interface Patient {
  _id: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  roomNumber: string;
  bedNumber: string;
  floorNumber: string;
  contact: string;
  assignedStaff: string;
  diseases: string;
  allergies: string;
  EmergencyContactName: string;
  EmergencyContactNumber: string;
  EmergencyContactRelation: string;
  DietChartMorningMeal: string;
  DietChartMorningIngredients: string;
  DietChartMorningInstructions: string;
  DietChartEveningMeal: string;
  DietChartEveningIngredients: string;
  DietChartEveningInstructions: string;
  DietChartNightMeal: string;
  DietChartNightIngredients: string;
  DietChartNightInstructions: string;
  deliveryPerson?: string;
}

export default function PantryDashboard() {
  const [patientList, setPatientList] = React.useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showDelivery, setShowDelivery] = React.useState(false);
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = React.useState<
    string | null
  >(null);
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = React.useState<
    string | null
  >(null);

  const fetchPatientList = async () => {
    try {
      const response = await axios.get("/api/patient");
      setPatientList(response.data.patients);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching patient list", axiosError);
    }
  };

  const deletePatient = async (patientId: string) => {
    try {
      await axios.delete(`/api/patient?patientId=${patientId}`);
      toast.success("Patient deleted successfully");
      fetchPatientList();
    } catch (error) {
      const axiosError = error as AxiosError; 
      console.error("Error deleting patient", axiosError);
      toast.error("Error deleting patient");
    }
  };

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
      setSelectedDeliveryPerson(deliveryPerson);
      fetchPatientList();
    } catch (error) {
      const axiosError = error as AxiosError; // Type the error as AxiosError
      console.error("Failed to update delivery person", axiosError);
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
      setSelectedDeliveryStatus(deliveryStatus);
      fetchPatientList();
    } catch (error) {
      const axiosError = error as AxiosError; // Type the error as AxiosError
      console.error("Failed to update delivery status", axiosError);
      toast.error("Failed to update delivery status");
    }
  };

  const filteredPatients = patientList.filter((patient) =>
    patient.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {filteredPatients.map((patient) => {
          return (
            <div
              key={patient._id}
              className="bg-white p-4 rounded-md shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-500">
                Patient Name:{" "}
                <span className="text-black">{patient.patientName}</span>
              </h2>
              {/* Display other patient details */}
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
