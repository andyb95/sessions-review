insert into cars(make, model, miles, year, color)
values(${make}, ${model}, ${miles}, ${year}, ${color})
returning *;