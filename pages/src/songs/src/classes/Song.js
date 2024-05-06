const Song = class {
  constructor(attributes) {
    this.body = attributes.body.processed;
    this.title = attributes.title;
    this.number = attributes.field_number;
  }
};

export default Song