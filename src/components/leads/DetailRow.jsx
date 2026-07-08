const DetailRow = ({ label, value }) => {
  return (
    <tr>
      <th>{label}</th>
      <td>{value || "-"}</td>
    </tr>
  );
};

export default DetailRow;