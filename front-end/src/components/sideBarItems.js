export default {
  data: [
    {
      name: "Staff Management",
      children: [
        {
          name: "Staff Status",
          url: "/staff",
        },
        {
          name: "Add Staff",
          url: "/staff/add",
        },
        {
          name: "Modify Staff",
          url: "/staff/modify",
        },
      ],
      icon: 1,
    },
    {
      name: "Customer Management",
      children: [
        {
          name: "Customer Status",
          url: "/customer",
        },
        {
          name: "Add Customer",
          url: "/customer/add",
        },
        {
          name: "Modify Customer",
          url: "/customer/modify",
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
        {
          name: "Modify Reservation",
          url: "/reserve/modify",
        },
      ],
      icon: 3,
    },
    {
      name: "Hotel Management",
      children: [
        {
          name: "Hotel status",
          url: "/hotel",
        },
        {
          name: "Add Hotel",
          url: "/hotel/add",
        },
        {
          name: "Modify Hotel",
          url: "/hotel/modify",
        },
        {
          name: "Modify Room",
          url: "/hotel/modify/room",
        },
        {
          name: "Modify Manager",
          url: "/hotel/modify/manager",
        },
        {
          name: "Modify Facility",
          url: "/hotel/modify/facility",
        },
      ],
      icon: 4,
    },
    {
      name: "Order Management",
      children: [
        {
          name: "Current Order",
          url: "/order",
        },
        {
          name: "Order History",
          url: "/order/history",
        },
      ],
      icon: 5,
    },
  ],
};
