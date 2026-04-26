import NewBookingForm from "./form";
import { getAllServices } from "../../actions/services";

export default async function NewBookingPage() {
  const services = await getAllServices();
  const activeServices = services
    .filter((s) => s.active)
    .map((s) => ({
      id: s.id,
      name: s.name,
      duration: s.duration,
      price: s.price,
      category: s.category,
    }));

  return <NewBookingForm services={activeServices} />;
}
