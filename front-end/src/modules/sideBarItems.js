export default {
  data: [
    {
      name: "Staff Management",
      children: [
        {
          name: "Staff Status",
          url: "/staff/status",
        },
      ],
      icon: 1,
    },
    {
      name: "Customer Management",
      children: [
        {
          name: "Customer Status",
          url: "/customer/status",
        },
      ],
      icon: 2,
    },
    {
      name: "Reservation Management",
      children: [
        {
          name: "Reservation Status",
          url: "/reserve/status",
        },
        {
          name: "Add Reservation",
          url: "/reserve/add",
        },
      ],
      icon: 3,
    },
    {
      name: "Order Management",
      children: [
        {
          name: "Current Order",
          url: "/order/current",
        },
        {
          name: "Order History",
          url: "/order/history",
        },
      ],
      icon: 5,
      
    },
    {
      name: "Room Management",
      children: [
        {
          name: "Room status",
          url: "/room",
        }
      ],
      icon: 4,
    },
    {
      name: "Hotel Management",
      children: [
        {
          name: "Hotel status",
          url: "/hotel",
        },
        {
          name: "Modify Facility",
          url: "/hotel/facility",
        },
      ],
      icon: 6,
    },
  ],
  
};
