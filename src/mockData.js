// mockData.js

const mockData = [
  {
    license_id: "license2",
    organisation: "dummy",
    valid_from: "2024-09-12T12:27:01+05:30",
    valid_till: "2024-09-30T12:27:08+05:30",
    allocated_to: "",
    status: "1",
    plugins: [],
  },
  {
    license_id: "licenseekv",
    organisation: "ekvay",
    valid_from: "2024-09-01T14:20:46+05:30",
    valid_till: "2024-09-24T23:30:00+05:30",
    allocated_to: "ekvayu@gmail.com",
    status: "1",
    plugins: [
      {
        plugin_id: "licenseekv",
        license_id: "licenseekv",
        browser: "chrome",
        ip_add: "127.0.0.1",
        install_date: "2024-09-11T14:49:31+05:30",
        create_timestamp: "2024-09-11T14:50:55.321912+05:30",
        last_updated_timestamp: "2024-09-11T14:50:55.321912+05:30",
      },
    ],
  },
  // Add more rows as needed
];

export const UserData = {
  full_name: "test test1",
  phone_number: "834879234",
  address: "errr",
  organization: "rrr",
  email: "test1@yopmail.com",
};

export const licenseReportData = [
  { srNo: 1, allocatedEmail: "user1@example.com", userTill: "2023-12-31T23:59:59Z" },
  { srNo: 2, allocatedEmail: "user2@example.com", userTill: "2024-06-30T23:59:59Z" },
  { srNo: 3, allocatedEmail: "user3@example.com", userTill: "2023-09-15T23:59:59Z" },
  { srNo: 4, allocatedEmail: "user4@example.com", userTill: "2024-03-31T23:59:59Z" },
  { srNo: 5, allocatedEmail: "user5@example.com", userTill: "2023-11-30T23:59:59Z" },
];


export default mockData;
