export default {
  name: "animal",
  type: "document",
  title: "Animal",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      title: "Beskrivelse",
      name: "beskrivelse",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
}
