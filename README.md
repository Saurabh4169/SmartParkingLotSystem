------------- Smart Parking Lot System

A full-stack web application that automatically manages and allocates parking slots based on vehicle requirements like EV charging and covered parking.

---- Live Demo:
---- GitHub Repository: 

----- Features
----- Add Parking Slot

Users can create new parking slots with:

Slot Number

Covered / Not Covered

EV Charging Available / Not Available

------- View All Slots

Displays all parking slots with:

Slot Number

Covered Status

EV Charging Availability

Occupancy Status

🚗 Park Vehicle (Smart Allocation)

--- User selects:

Needs EV charging

Needs Covered parking

System:

Finds the nearest matching available slot

--- Marks it as occupied

Displays success or "No slot available"

-----  Remove Vehicle

User enters slot number

Slot becomes free again

----- Allocation Logic

When parking a vehicle, the system:

Filters only unoccupied slots

Applies conditions:

If EV required → slot must support EV charging

If Covered required → slot must be covered

Chooses the nearest slot (lowest slot number)

Marks the slot as occupied

🛠 Tech Stack
Layer	Technology
Backend	Node.js + Express
Database	MongoDB Atlas (Cloud) / MongoDB Local
Frontend	EJS Templates
Styling	CSS
Deployment	Render