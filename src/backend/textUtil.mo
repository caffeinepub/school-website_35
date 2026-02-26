import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Array "mo:core/Array";

module {
  public func padLeft(text : Text, totalLength : Nat, padChar : Char) : Text {
    let currentLength = text.size();
    if (currentLength >= totalLength) {
      return text;
    };

    let padLength = totalLength - currentLength;
    let padTextArray = Array.repeat(padChar, padLength);
    let padText = Text.fromArray(padTextArray);
    padText # text;
  };
};

