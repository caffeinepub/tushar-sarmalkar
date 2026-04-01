import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Principal "mo:core/Principal";

actor {
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  module ContactMessage {
    public func compare(message1 : ContactMessage, message2 : ContactMessage) : Order.Order {
      switch (Text.compare(message1.name, message2.name)) {
        case (#equal) { Text.compare(message1.email, message2.email) };
	      case (order) { order };
      };
    };


    public func compareByEmail(message1 : ContactMessage, message2 : ContactMessage) : Order.Order {
      Text.compare(message1.email, message2.email);
    };
  };

  let messages = List.empty<ContactMessage>();

  public shared ({ caller }) func submitMessage(name : Text, email : Text, message : Text) : async () {
    let newMessage : ContactMessage = {
      name;
      email;
      message;
    };
    messages.add(newMessage);
  };

  public query ({ caller }) func getAllByName() : async [ContactMessage] {
    messages.values().toArray().sort();
  };

  public query ({ caller }) func getAllByEmail() : async [ContactMessage] {
    messages.values().toArray().sort(ContactMessage.compareByEmail);
  };
};
