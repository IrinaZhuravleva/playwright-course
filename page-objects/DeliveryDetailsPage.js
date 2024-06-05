export class DeliveryDetailsPage {
  constructor(page) {
    this.page = page;
  }

  fillDetails = async () => {
    await this.page.pause()
  }
}