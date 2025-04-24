import { FaTrash, FaEdit } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizControlButtons({
  quiz,
  onDelete,
  onEdit,
}: {
  quiz: any;
  onDelete: (quizId: string) => void;
  onEdit?: (quizId: string) => void;
}) {
  return (
    <div className="float-end">
      <FaTrash
        className="text-danger me-3"
        onClick={() => onDelete(quiz._id)}
        title="Delete Quiz"
        style={{ cursor: "pointer" }}
      />
      {onEdit && (
        <FaEdit
          className="text-primary me-3"
          onClick={() => onEdit(quiz._id)}
          title="Edit Quiz"
          style={{ cursor: "pointer" }}
        />
      )}
      <IoEllipsisVertical
        className="fs-4"
        title="More Options"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}