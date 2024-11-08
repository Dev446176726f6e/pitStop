-- AddForeignKey
ALTER TABLE "service-list-item" ADD CONSTRAINT "service-list-item_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
