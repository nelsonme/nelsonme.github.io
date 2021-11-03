//setup
console.clear();
data = [];
N = 1000;
seed(1999); // seed the random number generator

// generate some data
for (i = 0; i < N; i++) data[i] = randn(3);

// make a histogram
figure(1);
bins = linspace(-10, 10, 40);
result = hist(data, bins);
plot(bins, result.counts, 'b|');
xlabel('value');
ylabel('count');