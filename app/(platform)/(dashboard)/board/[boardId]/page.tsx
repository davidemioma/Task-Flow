export default function BoardPage({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  const { boardId } = params;

  return <div>BoardPage {boardId}</div>;
}
