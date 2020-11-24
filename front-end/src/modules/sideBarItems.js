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
      name: "Hotel Management 수정필요",
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
  ],
  
};
