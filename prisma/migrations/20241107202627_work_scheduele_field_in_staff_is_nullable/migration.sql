-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_work_scheduele_id_fkey";

-- AlterTable
ALTER TABLE "staff" ALTER COLUMN "work_scheduele_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_work_scheduele_id_fkey" FOREIGN KEY ("work_scheduele_id") REFERENCES "work_graphic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
