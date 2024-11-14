import { pricingPlaceholder } from "./_components/pricing-placeholder";

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container h-screen content-center grid lg:grid-cols-2">
      <div className="flex items-center">
        <div>
          <p className="">Free for 14 days, then the price will be $99/m</p>
          <div className="flex flex-col gap-3 mt-16">
            {pricingPlaceholder.map((item) => (
              <p
                key={item.id}
                className="flex gap-1 justify-start items-center"
              >
                <item.icon className="h-4 w-4" /> {item.label}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CreateLayout;
