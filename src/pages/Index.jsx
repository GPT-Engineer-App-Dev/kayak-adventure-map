import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [trips, setTrips] = useState([]);
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSaveTrip = () => {
    const newTrip = {
      id: Date.now(),
      name: tripName,
      startDate,
      endDate,
      description,
      difficulty,
      location: [51.505, -0.09], // Default location (London)
    };
    setTrips([...trips, newTrip]);
    // Reset form
    setTripName("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setDifficulty("");
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Kayaking Trip Planner</h1>
        <p className="text-xl text-gray-600">Plan your perfect kayaking adventure</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Map</CardTitle>
              <CardDescription>View your kayaking destinations</CardDescription>
            </CardHeader>
            <CardContent>
              <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {trips.map((trip) => (
                  <Marker key={trip.id} position={trip.location}>
                    <Popup>{trip.name}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
              <CardDescription>Enter your trip information</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input
                  placeholder="Trip Name"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                />
                <Input
                  type="date"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                  type="date"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSaveTrip}>Save Trip</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Saved Trips</CardTitle>
              <CardDescription>Your planned kayaking adventures</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {trips.map((trip) => (
                  <li key={trip.id} className="bg-gray-100 p-2 rounded">
                    <h3 className="font-semibold">{trip.name}</h3>
                    <p className="text-sm text-gray-600">
                      {trip.startDate} - {trip.endDate}
                    </p>
                    <p className="text-sm">Difficulty: {trip.difficulty}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;