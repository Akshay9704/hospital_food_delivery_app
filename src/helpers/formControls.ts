export const registerFormControls = [
  {
    name: "username",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
  {
    name: "role",
    label: "Role",
    componentType: "select",
    options: [
      {
        id: "staff",
        label: "Pantry Staff",
      },
      {
        id: "delivery",
        label: "Delivery Person",
      },
    ],
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addPatientFormElements = [
  {
    label: "Patient Name",
    name: "patientName",
    componentType: "input",
    type: "text",
    placeholder: "Enter patient name",
    required: true,
  },
  {
    label: "Diseases",
    name: "diseases",
    componentType: "textarea",
    placeholder: "Enter patient diseases",
  },
  {
    label: "Allergies",
    name: "allergies",
    componentType: "textarea",
    placeholder: "Enter patient allergies (comma-separated)",
  },
  {
    label: "Patient Age",
    name: "patientAge",
    componentType: "input",
    type: "number",
    placeholder: "Enter patient age",
    required: true,
  },
  {
    label: "Room Number",
    name: "roomNumber",
    componentType: "input",
    type: "number",
    placeholder: "Enter room number",
    required: true,
  },
  {
    label: "Bed Number",
    name: "bedNumber",
    componentType: "input",
    type: "number",
    placeholder: "Enter bed number",
  },
  {
    label: "Floor Number",
    name: "floorNumber",
    componentType: "input",
    type: "number",
    placeholder: "Enter floor number",
  },
  {
    label: "Patient Gender",
    name: "patientGender",
    componentType: "select",
    options: [
      { id: "male", label: "Male" },
      { id: "female", label: "Female" },
      { id: "other", label: "Other" },
    ],
    placeholder: "Select gender",
    required: true,
  },
  {
    label: "Contact",
    name: "contact",
    componentType: "input",
    type: "text",
    placeholder: "Enter contact number",
  },
  {
    label: "Emergency Contact Name",
    name: "EmergencyContactName",

    componentType: "input",
    type: "text",
    placeholder: "Enter emergency contact name",
  },
  {
    label: "Emergency Contact Relation",
    name: "EmergencyContactRelation",
    componentType: "input",
    type: "text",
    placeholder: "Enter relation with emergency contact",
  },
  {
    label: "Emergency Contact Number",
    name: "EmergencyContactNumber",
    componentType: "input",
    type: "text",
    placeholder: "Enter emergency contact phone number",
  },
  {
    label: "Diet Chart (Morning Meal)",
    name: "DietChartMorningMeal",
    componentType: "input",
    type: "text",
    placeholder: "Enter morning meal",
  },
  {
    label: "Diet Chart (Morning Ingredients)",
    name: "DietChartMorningIngredients",
    componentType: "textarea",
    placeholder: "Enter morning ingredients (comma-separated)",
  },
  {
    label: "Diet Chart (Morning Instructions)",
    name: "DietChartMorningInstructions",
    componentType: "textarea",
    placeholder: "Enter morning meal instructions",
  },
  {
    label: "Diet Chart (Evening Meal)",
    name: "DietChartEveningMeal",
    componentType: "input",
    type: "text",
    placeholder: "Enter evening meal",
  },
  {
    label: "Diet Chart (Evening Ingredients)",
    name: "DietChartEveningIngredients",
    componentType: "textarea",
    placeholder: "Enter evening ingredients (comma-separated)",
  },
  {
    label: "Diet Chart (Evening Instructions)",
    name: "DietChartEveningInstructions",
    componentType: "textarea",
    placeholder: "Enter evening meal instructions",
  },
  {
    label: "Diet Chart (Night Meal)",
    name: "DietChartNightMeal",
    componentType: "input",
    type: "text",
    placeholder: "Enter night meal",
  },
  {
    label: "Diet Chart (Night Ingredients)",
    name: "DietChartNightIngredients",
    componentType: "textarea",
    placeholder: "Enter night ingredients (comma-separated)",
  },
  {
    label: "Diet Chart (Night Instructions)",
    name: "DietChartNightInstructions",
    componentType: "textarea",
    placeholder: "Enter night meal instructions",
  },
  {
    label: "Assigned Staff",
    name: "assignedStaff",
    componentType: "select",
    options: [
      { id: "staff", label: "Staff" },
      { id: "staff1", label: "Staff 1" },
      { id: "staff2", label: "Staff 2" },
    ],
    placeholder: "Enter staff IDs (comma-separated)",
  }  
];