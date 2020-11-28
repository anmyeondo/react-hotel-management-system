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
          url: "/reservation",
        },
      ],
      icon: 3,
    },
    {
      name: "Order Management",
      children: [
        {
          name: "Order status",
          url: "/order",
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
          name: "Restaurant status",
          url: "/restaurant"
        },
        {
          name: "Parking lot status",
          url: "/parking_lot",
        },
      ],
      icon:6,
    },
  ],
  
};
