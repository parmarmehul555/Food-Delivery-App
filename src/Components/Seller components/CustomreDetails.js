import useGetCustomerDetails from "../../hooks/useGetCustomerDetails"

export default function CustomerDetails() {
    const [customers] = useGetCustomerDetails();
    console.log("================",customers);
    const formattedCustomers = customers.map((item) => {
        return (
            <div className="row customerRow">
                <div className="col">
                    <text id="food-product">{item.username}</text>
                </div>
                <div className="col">
                    <text id="food-product">{item.email}</text>
                </div>
                <div className="col">
                    <text id="food-product">{item.phNo}</text>
                </div>
                <div className="col">
                    <text id="food-product">{item.address}</text>
                </div>
            </div>
        )
    })
    return (
        <>
            <div className="container-fluied text-center">
                <div className="row">
                    <div className="col">
                        <h5>User Name</h5>
                    </div>
                    <div className="col">
                        <h5>Email</h5>
                    </div>
                    <div className="col">
                        <h5>Mobile number</h5>
                    </div>
                    <div className="col">
                        <h5>Address</h5>
                    </div>
                </div>
                {formattedCustomers}
            </div>
        </>
    )
}