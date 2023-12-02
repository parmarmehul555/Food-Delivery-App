import useGetCustomerDetails from "../../hooks/useGetCustomerDetails"

export default function CustomerDetails() {
    const [customers] = useGetCustomerDetails();
    console.log("================",customers);
    const formattedCustomers = customers.map((item) => {
        return (
            <div className="row customerRow">
                <div className="col">
                    <p>{item.username}</p>
                </div>
                <div className="col">
                    <p>{item.email}</p>
                </div>
                <div className="col">
                    <p>{item.phNo}</p>
                </div>
                <div className="col">
                    <p>{item.address}</p>
                </div>
            </div>
        )
    })
    return (
        <>
            <div className="container-fluied text-center">
                <div className="row">
                    <div className="col">
                        <h4>User Name</h4>
                    </div>
                    <div className="col">
                        <h4>Email</h4>
                    </div>
                    <div className="col">
                        <h4>Mobile number</h4>
                    </div>
                    <div className="col">
                        <h4>Address</h4>
                    </div>
                </div>
                {formattedCustomers}
            </div>
        </>
    )
}