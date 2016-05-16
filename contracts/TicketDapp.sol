// This is a simple ticket sales contract
contract TicketDapp {

    // The organizer of the event
    address public organizer;
    // The name of the event
    string name;
    // All tickets
    TicketType[] public tickets;

    struct TicketType {
        // A plain text description of the ticket type, i.e.: VIP, Standing, Seated, etc...
        string description;
        // The price of the ticket
        uint price;
        // The amount of tickets available
        uint quota;
        // The amount of tickets sold
        uint owners;
        // map ticket to owner
        mapping (address => uint) paid;
    }

    event BuyTicket(uint _id, address _from, uint _amount); // so you can log the event

    function TicketDapp(
        string _name,
        uint _price,
        uint _quota
    ) {
        organizer = msg.sender;
        name = _name;
        // Set defaults
        TicketType t = tickets[tickets.length];
        t.description = _name;
        t.price = _price;
        t.quota = _quota;
        t.owners = 0;
    }

    function buyTicket(
        uint _ticketID
    ) public {
        TicketType t = tickets[_ticketID];
        if (t.owners >= t.quota || t.price > msg.value) {
            throw; // throw ensures funds will be returned
        }
        t.paid[msg.sender] = msg.value;
        t.owners ++;
        BuyTicket(_ticketID, msg.sender, msg.value);
    }

    function amendTicketType(
        uint _ticketID,
        string _description,
        uint _quota
    ) public {
        if (msg.sender != organizer) { return; }
        TicketType t = tickets[_ticketID];
        if (t.owners > _quota) { return; }
        t.description = _description;
        t.quota = _quota;
    }

    function refundTicket(
        address owner,
        uint _ticketID
    ) public {
        if (msg.sender != organizer) { return; }
        address contractAddress = this;

        if (_ticketID < 0) { // Refund all tickets purchased by owner
            for (uint i=0; i<tickets.length; i++) {
                if (tickets[i].owners == 0 || contractAddress.balance < tickets[i].paid[owner] || tickets[i].paid[owner] <= 0) {
                    continue;
                }
                //TODO: Events
                contractAddress.send(tickets[i].paid[owner] - (tickets[i].paid[owner] / 20)); // 5% refund fee
                tickets[i].paid[owner] = 0;
                tickets[i].owners--;
            }
        } else {
            TicketType t = tickets[_ticketID];
            if (t.owners == 0 || contractAddress.balance < t.paid[owner] || t.paid[owner] <= 0) {
                return;
            }
            //TODO: Events
            contractAddress.send(t.paid[owner] - (t.paid[owner] / 20)); // 5% refund fee
            t.paid[owner] = 0;
            t.owners--;
        }

        return;
    }

    function destroy() {
        if (msg.sender == organizer) {
            suicide(organizer);
        }
    }
}
