#include <cmath>
#include <emscripten.h>
#include <iostream>
#include <emscripten/bind.h>
#include <emscripten/val.h>

using namespace emscripten;

int ordererd;
int *flatty;
extern "C"
{
    void arrS(int *flattenedMatrix, int order)
    {
        int sum = 0;
        int n = sqrt(order);
        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    if (flattenedMatrix[i * n + k] + flattenedMatrix[n * k + j] < flattenedMatrix[i * n + j])
                        flattenedMatrix[i * n + j] = flattenedMatrix[i * n + k] + flattenedMatrix[k * n + j];

        flatty = flattenedMatrix;
        ordererd = order;
    }
}
val getArray()
{
    return val(typed_memory_view(size_t(ordererd), flatty));
}

EMSCRIPTEN_BINDINGS()
{
    function("getArray", &getArray, allow_raw_pointers());
}