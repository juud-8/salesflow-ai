import PricingTable from '@/components/ui/PricingTable';

export const metadata = {
  title: 'Pricing',
};

export default function PricingPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Choose Your Plan</h1>
      <PricingTable />
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">FAQ</h2>
        <ul className="space-y-2 text-sm">
          <li>Can I upgrade later? Yes, at any time.</li>
          <li>Is there a free trial? Contact us for details.</li>
          <li>How does billing work? Subscriptions renew monthly.</li>
        </ul>
      </section>
    </div>
  );
}
