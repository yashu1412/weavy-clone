/*
  Warnings:

  - The primary key for the `workflows` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "workflow_runs" DROP CONSTRAINT "workflow_runs_workflow_id_fkey";

-- AlterTable
ALTER TABLE "workflow_runs" ALTER COLUMN "workflow_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "workflows" DROP CONSTRAINT "workflows_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "workflows_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "workflows_id_seq";

-- AddForeignKey
ALTER TABLE "workflow_runs" ADD CONSTRAINT "workflow_runs_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;
