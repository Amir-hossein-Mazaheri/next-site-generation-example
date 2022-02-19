import Card from "./Card";

function Cards({ data }) {
    return (
      <div className="md:grid grid-cols-2 space-y-8 gap-8">
        {data.map((d) => (
          <Card
            key={d.id}
            title={d.title}
            description={d.body}
            author={d.userId}
            id={d.id}
          />
        ))}
      </div>
    );
}

export default Cards;